const User = require('../../schemas/user.js');
const mongoose = require('mongoose');

module.exports = (client) => {
    client.createProfile = async(userID) => {
        let Profile = await User.findOne({ userID: userID });

        // If the user already has a profile, we'll just return that
        if (Profile) return Profile;

        // Otherwise, we are going to create noe for them!
        Profile = new User({
            _id: mongoose.Types.ObjectId(),
            userID: userID,
            createdAt: Date.now(), 
            botBanned: false,
            balance: 25,
            hp: 100,
            xp: 0,
            level: 0,
            inventory: [],
            kills: [],
            deaths: [],
            commandsRan: {},
            vidpollvotes: {}
        })

        await Profile.save().catch((err) => console.log(err));

        return Profile;
    }
}