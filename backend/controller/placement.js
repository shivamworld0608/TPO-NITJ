import Placement from './models/placement'; // Adjust the path as needed
import moment from 'moment'; // For date handling

// Get placements added today
app.get('/api/placements/today', async (req, res) => {
  try {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const todayPlacements = await Placement.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json(todayPlacements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all placements
app.get('/api/placements', async (req, res) => {
  try {
    const allPlacements = await Placement.find().sort({ createdAt: -1 });
    res.json(allPlacements);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
