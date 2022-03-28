const YoutubeMusicApi = require("youtube-music-api");
const logger = require("../../logging/logging");

const ytm = new YoutubeMusicApi();

async function getVideoId(query) {
    await ytm.initalize();
    try {
        const result = await ytm.search(query, "video");
        const data = result.content[0].videoId;
        return { videoId: data };
    } catch (err) {
        logger.error(err);
        return false;
    }
}

exports.getVideoId = getVideoId;
