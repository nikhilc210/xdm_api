const Informative = require("../../models/Informative");

// Create or update informative content
exports.updateInformative = async (req, res) => {
  const { career, terms, privacy, spotify, about } = req.body;

  try {
    let informative = await Informative.findOne();

    if (!informative) {
      // if no document exists, create a new one with whichever field you sent
      informative = new Informative({ career, terms, privacy, spotify, about });
      await informative.save();
      return res.status(201).json({
        status: "success",
        message: "Informative content created",
        informative,
      });
    }

    // update only the fields sent in request
    if (career !== undefined) informative.career = career;
    if (terms !== undefined) informative.terms = terms;
    if (privacy !== undefined) informative.privacy = privacy;
    if (spotify !== undefined) informative.spotify = spotify;
    if (about !== undefined) informative.about = about;

    await informative.save();
    res.status(200).json({
      status: "success",
      message: "Informative content updated",
      informative,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get informative content
exports.getInformative = async (req, res) => {
  try {
    const informative = await Informative.findOne();
    if (!informative) {
      return res
        .status(404)
        .json({ status: "error", message: "No informative content found" });
    }
    res.status(200).json({ status: "success", data: informative });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
