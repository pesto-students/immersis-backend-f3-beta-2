const axios = require("axios");
const logger = require("../../logging/logging");

async function getSoundCloudUrl(info) {
    const scAId = "879ee6e6d6dc84d0e74b27a20d55030ab6a3a0cc";
    const queryUrn =
        "soundcloud%3Asearch-autocomplete%3A56770d66f4e34b11aa42b34ec47cf54f";
    const userId = "704923-225181-486085-807554";
    const clientId = "yeF9B1vgNUGUL7AnyRADuHfrSo0Fr9Mm";
    const { title, artist } = info;
    const query = `${title} ${artist}`;
    const url = `https://api-v2.soundcloud.com/search?q=${query}&sc_a_id=${scAId}&variant_ids=2442&query_urn=${queryUrn}&facet=model&user_id=${userId}&client_id=${clientId}&limit=1&offset=0&linked_partitioning=1&app_version=1640084493&app_locale=en`;

    try {
        const resp = await axios({
            url,
            headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language":
                    "en-IN,en-US;q=0.9,en;q=0.8,bn-IN;q=0.7,bn;q=0.6,en-GB;q=0.5,es;q=0.4",
                "sec-ch-ua":
                    '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Linux"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://soundcloud.com/",
                "Referrer-Policy": "origin",
                Authorization: "OAuth 2-290059-285911183-DiMTYAwx0iSAeJ"
            },
            body: null,
            method: "GET"
        });
        const track = resp.data.collection[0];
        let perma;
        if (track.kind === "playlist") {
            perma = track.tracks[0].permalink_url;
        } else {
            perma = track.permalink_url;
        }
        return { url: perma };
    } catch (error) {
        logger.error(error);
        return false;
    }
}

exports.getSoundCloudUrl = getSoundCloudUrl;
