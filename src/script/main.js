const playPause = document.getElementById("music-play-pause");
const previusMusic = document.getElementById("music-prev");
const nextMusic = document.getElementById("music-next");
const volumenIcon = document.getElementById("volumen-icon")
const fullScreen = document.getElementById('full-screen');
const cargando = document.getElementById('cargando');

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '-9gEgshJUuY',
        playerVars: {
            index: 0,
            listType: 'playlist',
            list: 'PL1MREynZp01gMoizoobLwkVpCTvD9QHaU'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady() {
    console.log('¿Listo para escuchar musica? 🎵')

    setInterval(async function () {
        if (player.getPlayerState() == YT.PlayerState.PLAYING) {
            cargando.classList.remove('center-1')
            cargando.classList.add('center')
        }
    }, 1000)
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

//Funcion para cambiar el icono play o pause
function toggleIcon() {
    playPause.classList.toggle("bx-pause-circle");
    playPause.classList.toggle("bx-play-circle");
}

//Funcion para mostrar la animacion de carga
function loading() {
    if (cargando.classList.contains('center')) {
        cargando.classList.remove('center')
        cargando.classList.add('center-1')
    } else {
        cargando.classList.remove('center-1')
        cargando.classList.add('center')
    }
}

//Funcion para pausar o encender la musica.
function playPauseVideo() {
    if (playPause.classList.contains("bx-play-circle")) {
        loading()
        toggleIcon();
        player.playVideo();
    } else {
        cargando.classList.remove('center-1')
        cargando.classList.add('center')
        toggleIcon();
        player.pauseVideo();
    }

    /* if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        toggleIcon();
        player.pauseVideo();
    } else {
        loading()
        toggleIcon();
        player.playVideo();
    } */

}

playPause.addEventListener("click", () => {
    playPauseVideo()
});

//Funcion para pausar o encender la musica con la tecla (espacio).
window.addEventListener("keydown", (evento) => {
    if (evento.code == "Space") {
        playPauseVideo();
    }
});

function iconPause() {
    if (playPause.classList.contains("bx-play-circle")) {
        playPause.classList.remove("bx-play-circle")
        playPause.classList.add("bx-pause-circle")
    }
}

//Funcion para cambiar de musica
const cuerpo = document.getElementById('cuerpo')
function nextMusicEvet() {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        return;
    } else {
        loading()
        player.nextVideo()
    }
}

nextMusic.addEventListener("click", () => {
    nextMusicEvet()
});

//Funcion para cambiar de musica
function previusMusicEvent() {
    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        return;
    } else {
        loading()
        player.previousVideo()
    }
}

previusMusic.addEventListener("click", () => {
    previusMusicEvent()
});

//Funcion para cambiar el icono del volumen
function toggleIconMute() {
    volumenIcon.classList.toggle("bx-volume-mute");
}

//Funcion para mutear el sistema
function muteMusicEvent() {
    if (player.isMuted() == false) {
        player.mute()
        toggleIconMute()
    } else {
        player.unMute()
        toggleIconMute()
    }
}

volumenIcon.addEventListener("click", () => {
    muteMusicEvent()
})

//Funcion para el control del volumen
const volumen = document.getElementById("volumen")
volumen.oninput = (e) => {
    const vol = e.target.value

    if (vol < 1 || vol == 0) {
        volumenIcon.classList.remove('bx-volume-full')
        volumenIcon.classList.remove('bx-volume-low')
        volumenIcon.classList.add('bx-volume')
    }

    if (vol > 1 || vol == 1) {
        volumenIcon.classList.remove('bx-volume')
        volumenIcon.classList.add('bx-volume-low')
    }

    if (vol > 70) {
        volumenIcon.classList.remove('bx-volume-low')
        volumenIcon.classList.add('bx-volume-full')
    }

    player.setVolume(vol)
}


//Funcion para poner el reproductor en pantalla completa
function fullScreenIcon() {
    if (fullScreen.classList.contains("bx-fullscreen")) {
        fullScreen.classList.remove("bx-fullscreen")
        fullScreen.classList.add("bx-exit-fullscreen")
    } else {
        fullScreen.classList.remove("bx-exit-fullscreen")
        fullScreen.classList.add("bx-fullscreen")
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

fullScreen.addEventListener("click", () => {
    fullScreenIcon()
    toggleFullScreen()
})