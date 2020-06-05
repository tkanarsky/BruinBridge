import { realtime } from "./firebase.js"
import { getUser } from "./userDatabase.js"

const chatRef = realtime.ref("chats");

function getChatHash(uid1, uid2) {
    let hash = ""
    if (uid1 < uid2) {
        hash += uid1 + uid2;
    } else {
        hash += uid2 + uid1;
    }
    return hash;
}

export function chatExists(uid1, uid2, callback) {
    chatRef.child(getChatHash(uid1, uid2)).once('value', (chat) => {
        callback(chat.exists());
        return;
    });
}

export function establishChat(mentorId, menteeId) {
    chatExists(mentorId, menteeId, (exists) => {
        if (!exists) {
            getUser(mentorId, (mentorData) => {
                getUser(menteeId, (menteeData) => {
                    console.log(mentorData);
                    console.log(menteeData);
                    chatRef.child(getChatHash(mentorId, menteeId)).set({
                        mentor_id: mentorId,
                        mentor_name: mentorData.name,
                        mentor_avatar: mentorData.avatar,
                        mentee_id: menteeId,
                        mentee_name: menteeData.name,
                        mentee_avatar: menteeData.avatar,
                    });
                });
            });
        }
    });
}

export function sendMessage(user, mentorId, menteeId, text) {
    let newMessage = chatRef.child(getChatHash(mentorId, menteeId)).child("messages").push();
    newMessage.set({
        sender: user.uid,
        sender_name: user.displayName,
        sender_avatar: user.photoURL,
        text: text,
        timestamp: Date.now()
    })
}

export function getMessages(user, mentorId, menteeId, callback) {
    if (!(user.uid === mentorId || user.uid === menteeId)) return false;
    chatRef.child(getChatHash(mentorId, menteeId)).child("messages").once("value", (snapshot) => {
        let messages = [];
        snapshot.forEach((message) => {
            messages.push(message.val());
        });
        callback(messages);
    });
}

export function subscribeToChat(user, mentorId, menteeId, callback) {
    if (!(user.uid === mentorId || user.uid === menteeId)) return false;
    chatRef
    .child(getChatHash(mentorId, menteeId))
    .child("messages")
    .on("child_added", (data) => {
        callback(data.val());
    });
}

export function unsubscribeFromChat(user, mentorId, menteeId) {
    if (!(user.uid === mentorId || user.uid === menteeId)) return false;
    chatRef
    .child(getChatHash(mentorId, menteeId))
    .child("messages")
    .off("child_added");
}