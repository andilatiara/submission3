/* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("Service Worker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(err) {
            console.error("Registrasi Service Worker gagal.", err);
        });
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diizinkan.");
                return;
            }
            else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan izin.");
                return;
            }


            function urlBase64ToUint8Array(base64String) {
              const padding = '='.repeat((4 - base64String.length % 4) % 4);
              const base64 = (base64String + padding)
                  .replace(/-/g, '+')
                  .replace(/_/g, '/');
              const rawData = window.atob(base64);
              const outputArray = new Uint8Array(rawData.length);
              for (let i = 0; i < rawData.length; ++i) {
                  outputArray[i] = rawData.charCodeAt(i);
              }
              return outputArray;
          }

            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BHcsXVF803WDU5_OfKV-s60LfuM7gUMjihkU0jqFl8im34Jzh95XXZTQmJkDZmn_3-ReqEroHnAJpc5cTbEwwcQ")
                    }).then(function(subscribe) {
                        console.log("Berhasil melakukan subscribe");
                        console.log("[Endpoint]: ", subscribe.endpoint);
                        console.log("[p256dh key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("[Auth key]: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("Tidak dapat melakukan subscribe", e.message);
                    })
                })
            }
        });
    }
}
