import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TwilioConversationService } from 'src/app/services/twilio.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import * as Video from 'twilio-video';
import { RdvService } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-visio-conference',
  templateUrl: './visio-conference.component.html',
  styleUrls: ['./visio-conference.component.scss'],
})
export class VisioConferenceComponent implements OnInit, AfterViewInit {
  twilioToken: string;
  roomName: string;
  camStatus: boolean = true;
  microStatus: boolean = true;
  loading: boolean = true;
  disconnected: boolean = false;
  room: Video.Room;
  localParticipant: Video.Participant;

  constructor(
    private tokenStorageService: TokenStorageService,
    private conversationService: TwilioConversationService,
    private route: ActivatedRoute,
    private router: Router,
    private rdvService: RdvService
  ) {}

  ngOnInit(): void {
    console.log('this is the video conference component !');
  }

  ngAfterViewInit() {
    this.initRoom();
  }

  initRoom() {
    this.route.queryParamMap.subscribe((params) => {
      //this.paramsObject = { ...params.keys, ...params };
      let appointmentId = params.get('rdv');
      if (appointmentId && appointmentId != null) {
        this.getAppointment(appointmentId);
      } else {
        alert('not valid appointment !');
      }
    });
  }

  getAppointment(appointment_id: string) {
    this.rdvService.getSession(appointment_id).subscribe(
      (data) => {
        if (data.session) {
          if (data?.session?.in_video && data?.session?.room) {
            console.log(this.room);
            this.roomName = data.session.room;
            this.getToken();
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async joinRoom() {
    await Video.connect(this.twilioToken, {
      name: this.roomName,
      region: 'de1',
      logLevel: 'debug',
    }).then(
      (room) => {
        console.log(`Successfully joined a Room: ${room}`);
        console.log(room);
        this.loading = false;
        this.handleConnectedParticipant(room.localParticipant);

        room.participants.forEach(this.handleConnectedParticipant);
        room.on('participantConnected', this.handleConnectedParticipant);

        console.log(room.participants);
        this.room = room;
        this.localParticipant = room.localParticipant;
      },
      (error) => {
        console.error(`Unable to connect to Room ${this.roomName}: ${error}`);
      }
    );
  }

  handleConnectedParticipant = (participant) => {
    const container = document.getElementById('video-container');
    // create a div for this participant's tracks
    const participantDiv = document.createElement('div');

    participantDiv.setAttribute('id', participant.identity);
    participantDiv.setAttribute('class', 'item');
    container.appendChild(participantDiv);

    console.log(participant.identity);

    // iterate through the participant's published tracks and
    // call `handleTrackPublication` on them
    participant.tracks.forEach((trackPublication) => {
      this.handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on('trackPublished', this.handleTrackPublication);
  };

  handleTrackPublication = (trackPublication, participant) => {
    function displayTrack(track) {
      // append this track to the participant's div and render it on the page
      const participantDiv = document.getElementById(participant.identity);
      // track.attach creates an HTMLVideoElement or HTMLAudioElement
      // (depending on the type of track) and adds the video or audio stream
      participantDiv.append(track.attach());
    }

    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on('subscribed', displayTrack);
  };

  getToken() {
    let token = this.conversationService
      .getVideoRoomToken({ room: this.roomName })
      .subscribe(
        (data) => {
          this.tokenStorageService.saveTwilioVideoToken(data.token);
          this.twilioToken = data.token;
          this.joinRoom();
        },
        (error) => {}
      );
  }

  disableVideo() {
    this.camStatus = !this.camStatus;
    const videoTrack = [...this.room.localParticipant.videoTracks.values()][0]
      .track;
    if (this.camStatus) {
      videoTrack.restart();
    } else {
      const videoTrack = [...this.room.localParticipant.videoTracks.values()][0]
        .track;
      videoTrack.stop();
    }
  }
  disableMicro() {
    this.microStatus = !this.microStatus;
    const audioTrack = [...this.room.localParticipant.audioTracks.values()][0]
      .track;
    if (this.microStatus) {
      audioTrack.enable();
    } else {
      const audioTrack = [...this.room.localParticipant.audioTracks.values()][0]
        .track;
      audioTrack.disable();
    }
  }
  disconnect() {
    this.disconnected = true;
    this.room.disconnect();
  }
  quitter() {
    let userRole = this.tokenStorageService.getUser()?.role;
    if (userRole == 'Coach') {
      this.router.navigate(['/pages/coach/calendar']);
    } else if (userRole == 'Client') {
      this.router.navigate(['/pages/client/rdv/list']);
    }
  }
}
