# odysee-auto-liker <img src="https://raw.githubusercontent.com/Jekabs123/odysee-auto-liker/master/logo.svg" alt="odysee-auto-liker logo" height="48" align="right">

This userscript automatically likes videos on [Odysee](https://odysee.com/).

## Download

1. This is a userscript. To use it you'll first need one of the following browser extensions:

[Tampermonkey](https://www.tampermonkey.net/) (Firefox, Chrome, Edge, Safari, Opera, Dolphin browser, UC browser)
[Greasemonkey](https://www.greasespot.net/) (Firefox)
[Violentmonkey](https://violentmonkey.github.io/get-it/) (Firefox, Chrome, Edge, Opera (with Install Chrome Extensions extension))

2. Then install this script from one of the following links:
   * [GitHub](https://github.com/Jekabs123/odysee-auto-liker/raw/master/odysee-auto-liker.user.js) (Recommended)

## Options

You can configure the following options by editing `OPTIONS` within the script.

Option                   | Description                                                       | Default
------------------------ | ----------------------------------------------------------------- | -------
`CHECK_FREQUENCY`        | How often to attempt liking the video.                            | `5000`
`WATCH_THRESHOLD`        | <p>The percentage of the video watched before liking.</p>![][im1] | `0.5`
`LIKE_IF_NOT_SUBSCRIBED` | Whether to like videos when you are not following the creator.    | `false`

[im1]: readme-images/video-half-watched.png

## TODO

* Add options:
  * Retries - How many times to retry liking upon failure.
  * Whitelisted channels - A list of channels to *always* like the videos of, even if you are *not* subscribed to them.
  * Blacklisted channels - A list of channels to *never* like the videos of, even if you are subscribed to them.
* Add a UI so that the user can configure the options without needing to manually edit the script.

## Acknowledgements

* The userscript itself was inspired by [this one](https://greasyfork.org/en/scripts/4948-youtube-auto-like-videos) by JoeSimmons, which hasn't worked since 2015
* The debugger code was adapted from [this Stack Overflow answer](https://stackoverflow.com/a/32928812/2203482) by arctelix
