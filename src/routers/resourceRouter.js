const router = require("express").Router();
const { getVideoId } = require("../utils/youtube/youtube");
const { getSearchResult, getLyrics } = require("../utils/genius/genius");
const { Auth, SaveSearch } = require("../middlewares/auth");
const { User } = require("../models/userModel");
const { getSoundCloudUrl } = require("../utils/soundcloud/soundcloud");

router.get("/search", SaveSearch, async (req, res) => {
    const { query } = req;
    const { q } = query;
    if (!q) {
        return res.json({ data: false });
    }

    const data = await getSearchResult(q);
    return res.json({ data });
});

router.get("/lyrics", async (req, res) => {
    const { query } = req;
    const { title } = query;
    const { artist } = query;

    if (!title || !artist) {
        return res.json({ data: false });
    }

    const data = await getLyrics({
        title,
        artist
    });

    return res.json({ data });
});

router.get("/video", async (req, res) => {
    const { query } = req;
    const { q } = query;
    if (!q) {
        return res.json({ data: false });
    }
    const videoId = await getVideoId(q);
    return res.json({ data: videoId });
});

router.get("/audio", async (req, res) => {
    const { query } = req;
    const { title } = query;
    const { artist } = query;
    if (!title || !artist) {
        return res.json({ data: false });
    }
    const urlData = await getSoundCloudUrl({ title, artist });
    return res.json({ data: urlData });
});

router.get("/searchHistory", Auth, async (req, res) => {
    const _id = req.user;
    const user = await User.findOne({ _id });
    const history = user.get("searchHistory", { strict: false });
    return res.json({
        success: true,
        searchHistory: history ? Object.keys(history) : []
    });
});

exports.ResourceRouter = router;
