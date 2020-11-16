var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BHcsXVF803WDU5_OfKV-s60LfuM7gUMjihkU0jqFl8im34Jzh95XXZTQmJkDZmn_3-ReqEroHnAJpc5cTbEwwcQ",
   "privateKey": "cnfLKnH-yTqga36g1yTordBZchHcFDDxedcb4AQYTaM"
};


webPush.setVapidDetails(
   'mailto:andilatiara@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint":  "https://fcm.googleapis.com/fcm/send/cLON5B7JecE:APA91bGF5i--KZ0-JJAV5_bKR5F6jczioetBQii-8ctdoYZjwt9vpzfY-SvuM1sKYCHgnuHFSiuSHJmN0RNk3eRo9ShtjuOrN1vELxr4jWWKyLm2ru1FmYjPhMu23VpJmafp8qWxqynx",
   "keys": {
       "p256dh": "BC4rwRMb/a85tnF4CJ4xaLOz5r5qiiyfQEJdlkKfAUmmbbNNGpflkTngG59sFfdgc06vhxKlQDO8Q9gzHjXmKDw=",
       "auth": "2kRy2hyncXA7pUCaYlq2Tg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '682064884483',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
