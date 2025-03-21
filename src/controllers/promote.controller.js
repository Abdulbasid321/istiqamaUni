// const User = require('../model/User')


// module.exports.promote =  async (req, res) => {
//     try {
//       const { userIds, newClassId } = req.body;
//       const users = await User.find({ _id: { $in: userIds } });
  
//       for (const user of users) {
//         if (user.currentClassId.toString() !== newClassId.toString()) {
//           const alreadyPromoted = user.classHistory.some(
//             (entry) => entry.classId.toString() === newClassId.toString()
//           );
//           if (!alreadyPromoted) {
//             user.classHistory.push({
//               classId: user.currentClassId,
//               fromDate: user.updatedAt,
//               toDate: new Date()
//             });
//             user.currentClassId = newClassId;
//             await user.save();
//           }
//         }
//       }
  
//       res.status(200).json({ message: 'Students promoted successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }


const User = require('../model/User');

module.exports.promote = async (req, res) => {
    try {
        const { userIds, newClassId } = req.body;
        const users = await User.find({ _id: { $in: userIds } });

        for (const user of users) {
            if (user.currentClassId.toString() !== newClassId.toString()) {
                const alreadyPromoted = user.classHistory.some(
                    (entry) => entry.classId.toString() === newClassId.toString()
                );
                if (!alreadyPromoted) {
                    user.classHistory.push({
                        classId: user.currentClassId,
                        fromDate: user.updatedAt,
                        toDate: new Date(),
                    });

                    // Update only the class-related fields directly in the database
                    await User.updateOne(
                        { _id: user._id },
                        { $set: { currentClassId: newClassId, classHistory: user.classHistory } }
                    );
                }
            }
        }

        res.status(200).json({ message: 'Students promoted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
