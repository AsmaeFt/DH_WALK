
const DATA = require('../models/DATA')
const createError = require('../utilitis/globalError')


exports.addNewData = async (req, res, next) => {
    try {
        const { month_name, weeks } = req.body;
        const existMonth = await DATA.findOne({ month_name });
 
        if (existMonth) {
            let allWeeksExist = true;
            const newWeeks = [];
 
            for (let week of weeks) 
            {
                const existWeek = existMonth.weeks.find(w => w.week_name === week.week_name);
                if (!existWeek) 
                {
                    allWeeksExist = false;
                    newWeeks.push(week);
                }
            }
 
            if (allWeeksExist) 
            {
                console.log('All weeks already exist');
                return res.status(400).json({ error: 'All weeks already exist' });
            } else 
            {
                existMonth.weeks.push(...newWeeks);
                await existMonth.save();
                return res.status(201).json(newWeeks);
            }
        } else 
        {
            const newData = new DATA({ month_name, weeks });
            await newData.save();
            return res.status(201).json(newData);
        }
    } catch (err) {
        next(err);
    }
};


exports.GLOBALDATA = async (req, res, next) => {
    try {
        const Data_Global = await DATA.aggregate([
            { $unwind: "$weeks" },  // Deconstructs the weeks array to enable per-week sorting
            { $sort: { "month_name": 1, "weeks.week_name": 1 } },  // Sorts first by month, then by week within each month
            { $group: { 
                _id: "$_id", 
                month_name: { $first: "$month_name" }, 
                weeks: { $push: "$weeks" }  // Reassembles the weeks into a single array per original document
            }},
            { $sort: { "month_name": 1 } },  // Ensures the final output is sorted by month
            { $project: { 
                _id: 0,  // Optionally exclude _id from results; remove this line if _id is needed
                month_name: 1, 
                weeks: 1 
            }}
        ]);
 
        if (Data_Global.length === 0) {
            return res.status(404).json({ error: 'No data found in the database' });
        }
 
        res.status(200).json(Data_Global);
    } catch (err) {
        next(err);
    }
};