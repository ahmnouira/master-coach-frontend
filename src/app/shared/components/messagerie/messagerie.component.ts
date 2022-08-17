import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Client, Conversation, Message } from '@twilio/conversations';
import { User } from 'src/app/models/user-model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TwilioConversationService } from 'src/app/services/twilio.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss'],
})
export class MessagerieComponent implements OnInit, AfterViewInit {
  twilioToken: string;
  conversations: any = [];
  currentConversation: any;
  messages: any[];
  currentUser: User;
  otherUser: string;
  msgContent: string = '';
  uploadError: string = '';
  public client: Client;
  allusersObjects: any = [];
  isEmojiPickerVisible = false;
  smileyI18n = {};
  isModeEdit = false;
  messageToEdit: any = {};
  fileToUpload = false;
  fileToUploadData = {
    fileName: '',
    fileContent: null,
    fileMediaType: '',
    fileSize: 0,
  };
  scrolltop: number = null;
  participantUnreadMessagesCount = 0;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private conversationService: TwilioConversationService,
    public sanitizer: DomSanitizer
  ) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.twilioToken = this.tokenStorageService.getTwilioToken();
    this.client = new Client(this.twilioToken);
    this.getAllUsers();
    this.smileyI18n = {
      search: 'Recherche',
      categories: {
        search: 'Résultats de recherche',
        recent: 'Récents',
        people: 'Smileys et personnes',
        nature: 'Animaux et nature',
        foods: 'Nourriture et boissons',
        activity: 'Activité',
        places: 'Voyages et lieux',
        objects: 'Objets',
        symbols: 'Symboles',
        flags: 'Drapeaux',
        custom: 'Personnalisé',
      },
    };
    this.client.on('stateChanged', (state) => {
      if (state === 'initialized') {
        this.getConversations();
      }
    });

    this.client.on('conversationAdded', (conversation) => {
      this.getConversations();
      this.updateConversationsUnreadCount();
    });

    this.client.on('messageAdded', (msg) => {
      this.messages.push({
        id: msg.sid,
        senderSid: msg.participantSid,
        author: msg.author,
        date: moment(msg.dateCreated).format('D MMM YYYY H:mm:'),
        body: msg.body,
      });
      this.scrollToBottom();
      this.updateConversationsUnreadCount();
    });

    let _this = this;
    this.client.on('tokenAboutToExpire', function () {
      _this.refreshToken();
    });
  }

  getConversations() {
    this.client.getSubscribedConversations().then((conversations) => {
      let conversationsList = [];
      conversations.items?.map(async (cnv: any) => {
        await cnv.getParticipants().then((users) => {
          users.map((user: any) => {
            if (user.identity != this.currentUser.email) {
              let participant1Object = this.allusersObjects.filter(
                (elem) => elem.email == user.identity
              )[0];
              cnv.channelState.friendlyName =
                participant1Object?.prenom +
                ' ' +
                participant1Object?.nom?.toUpperCase();
              cnv.channelState.userImage = participant1Object?.photo;
              cnv.channelState.userEmail = user.identity;
            }
          });
        });
        cnv.unreadCount = await cnv.getUnreadMessagesCount();
        conversationsList.push(cnv);
      });
      this.conversations = conversationsList;
      this.loadConversationMessage(conversations.items[0]);
    });
  }
  refreshToken() {
    let token = this.conversationService.createAccessToken().subscribe(
      (data) => {
        this.tokenStorageService.saveTwilioToken(data.token);
      },
      (error) => {}
    );
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollToBottom(), 10);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
      this.updateConversationsUnreadCount().then((r) => console.log(r));
    } catch (err) {
      console.log(err);
    }
  }

  async loadConversationMessage(conversation?) {
    this.currentConversation = conversation;
    await conversation?.getMessages().then((messages: any) => {
      let messageList = [];
      console.log(messages.items);
      messages.items.map((msg: Message) => {
        let mediaMessage = null;
        if (msg.media) {
          mediaMessage = msg.media;
          msg.media.getContentTemporaryUrl().then((url) => {
            mediaMessage.url = url;
          });
        }
        const message = {
          id: msg.sid,
          senderSid: msg.participantSid,
          author: msg.author,
          date: moment(msg.dateCreated).format('D MMM YYYY H:mm'),
          body: msg.body,
          media: mediaMessage,
          updated: msg.lastUpdatedBy ? true : false,
          updateDate: moment(msg.dateUpdated).format('D MMM YYYY H:mm'),
        };
        messageList.push(message);
      });
      this.messages = messageList;
      this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight;
      /*this.currentConversation.updateLastReadMessageIndex(messages.items[messages.items.length - 1 ].index)
        .then(updatedIndex => {
          // updated
          console.log(updatedIndex)
        });*/
    });

    await this.updateConversationsUnreadCount();
  }

  async sendNewMessage() {
    if (this.isModeEdit) {
      await this.updateMessage(this.messageToEdit);
    } else {
      if (this.fileToUpload) {
        let mediaObject = {
          filename: this.fileToUploadData.fileName,
          size: this.fileToUploadData.fileSize,
          contentType: this.fileToUploadData.fileMediaType,
          media: this.fileToUploadData.fileContent,
        };
        await this.currentConversation
          .prepareMessage()
          .setBody(this.msgContent)
          .addMedia(mediaObject)
          .build()
          .send();
        this.msgContent = '';
        await this.currentConversation.prepareMessage();
        this.fileToUpload = false;
        this.fileToUploadData = {
          fileName: '',
          fileContent: null,
          fileMediaType: '',
          fileSize: 0,
        };
        await this.loadConversationMessage(this.currentConversation);
      } else {
        await this.currentConversation
          .prepareMessage()
          .setBody(this.msgContent)
          .build()
          .send();
        this.msgContent = '';
        await this.currentConversation.prepareMessage();
        await this.loadConversationMessage(this.currentConversation);
      }
    }
    await this.getConversationsUnreadMessagesCount(this.currentConversation);
  }

  getConversationName(conversation) {
    if (conversation.channelState.friendlyName.includes('AND')) {
      let participant1 = conversation.channelState.friendlyName.split('AND')[0];
      let participant2 = conversation.channelState.friendlyName.split('AND')[1];
      let participant1Object = this.allusersObjects.filter(
        (elem) => elem.email == participant1
      )[0];
      let participant2Object = this.allusersObjects.filter(
        (elem) => elem.email == participant2
      )[0];
      if (participant1 != this.currentUser.email) {
        conversation.channelState.friendlyName =
          participant1Object?.prenom +
          ' ' +
          participant1Object?.nom?.toUpperCase();
        conversation.channelState.userImage = participant1Object?.photo;
        return conversation.channelState.friendlyName;
      } else {
        conversation.channelState.friendlyName =
          participant2Object?.prenom +
          ' ' +
          participant2Object?.nom?.toUpperCase();
        conversation.channelState.userImage = participant2Object?.photo;
        return conversation.channelState.friendlyName;
      }
    }
    return conversation.channelState.friendlyName;
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe((data) => {
      this.allusersObjects = data;
    });
  }

  getUserName(userEmail): string {
    let participant1Object = this.allusersObjects.filter(
      (elem) => elem.email == userEmail
    )[0];
    return (
      participant1Object?.prenom + ' ' + participant1Object?.nom?.toUpperCase()
    );
  }

  public addEmoji(event) {
    this.msgContent = `${this.msgContent}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  async deleteMessage(message) {
    if (message.author == this.currentUser.email) {
      await this.currentConversation.getMessages().then((messages: any) => {
        messages.items.forEach((msg) => {
          if (msg.sid == message.id) {
            msg.remove().then(async (msgDeleted) => {
              console.log('deleted from twilio');
              await this.loadConversationMessage(this.currentConversation);
            });
          }
        });
      });
    }
  }

  async updateMessage(message) {
    if (message.author == this.currentUser.email) {
      await this.currentConversation.getMessages().then((messages: any) => {
        messages.items.forEach((msg) => {
          if (msg.sid == message.id) {
            msg.updateBody(this.msgContent).then(async (msgDeleted) => {
              console.log('updated message');
              await this.loadConversationMessage(this.currentConversation);
              this.isModeEdit = false;
              this.msgContent = '';
            });
          }
        });
      });
    }
  }

  deleteConversation(conv) {
    this.client.getConversationBySid(conv.sid).then((conv) => {
      conv.delete().then((deleted) => {
        console.log('deleted from twilio');
        this.conversationService
          .deleteConversation(conv.sid)
          .subscribe((data) => {
            console.log('deleted from db');
            this.getConversations();
          });
      });
    });
  }

  importFile(event: any) {
    this.uploadError = null;

    if (event.target.files && event.target.files.length) {
      const max_size = 2097152;
      console.log(event.target.files[0].size);
      const allowed_types = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpg',
        'image/jpeg',
        'application/pdf',
        'image/png',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (event.target.files[0].size > max_size) {
        this.uploadError =
          'Taille maximale du fichier est ' + max_size / (1024 * 1024) + 'MO';

        return false;
      }

      if (!allowed_types.includes(event.target.files[0].type)) {
        this.uploadError =
          'Seulement ces extensions de fichiers sont acceptées ( JPG | PNG | DOCX | DOC | XLSX | XLS | PPTX | PPT | PDF  )';
        return false;
      }
      const [file] = event.target.files;
      console.log(file);
      file.arrayBuffer().then((buff) => {
        let x = new Uint8Array(buff);
        console.log(x);
        this.fileToUploadData.fileName = event.target.files[0].name;
        this.fileToUploadData.fileSize = event.target.files[0].size;
        this.fileToUploadData.fileMediaType = event.target.files[0].type;
        this.fileToUploadData.fileContent = x;
        this.fileToUpload = true;
        this.msgContent =
          this.fileToUploadData.fileName + '; ' + this.msgContent;
        return true;
      });
      //reader.readAsDataURL(file);
      return true;
    }
    return false;
  }

  async getConversationsUnreadMessagesCount(conversation) {
    conversation.unreadCount = await conversation.getUnreadMessagesCount();
  }

  async updateConversationsUnreadCount() {
    for (const cnv of this.conversations) {
      await this.getConversationsUnreadMessagesCount(cnv);
    }
  }

  goToUserProfile(email) {
    this.router.navigate(['/pages/user/detail'], { state: { id: email } });
  }

  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.currentConversation?.getMessages().then((messages: any) => {
      this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight;
      this.currentConversation
        .updateLastReadMessageIndex(
          messages.items[messages.items.length - 1].index
        )
        .then(async (updatedIndex) => {
          // updated
          console.log(messages.items[messages.items.length - 1].index);
          console.log(updatedIndex);
          await this.updateConversationsUnreadCount();
        });
    });
  }
}
