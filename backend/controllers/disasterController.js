const supabase = require('../config/supabase');

// Create
exports.createDisaster = async (req, res) => {
  try {
    const { title, location_name, description, tags, owner_id } = req.body;
    const { data, error } = await supabase
      .from('disasters')
      .insert([{ title, location_name, description, tags, owner_id }])
      .select();

    if (error) throw error;

    global.io.emit('disaster_updated', data[0]);
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating disaster:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Read
exports.getDisasters = async (req, res) => {
  try {
    const { tag } = req.query;
    let query = supabase.from('disasters').select('*').order('created_at', { ascending: false });

    if (tag) {
      query = query.contains('tags', [tag]);
    }

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching disasters:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update
exports.updateDisaster = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    const { data, error } = await supabase
      .from('disasters')
      .update(updatedFields)
      .eq('id', id)
      .select();

    if (error) throw error;

    global.io.emit('disaster_updated', data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error('Error updating disaster:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete
exports.deleteDisaster = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = await supabase.from('disasters').delete().eq('id', id);

    if (error) throw error;

    global.io.emit('disaster_updated', { id, deleted: true });
    res.json({ message: 'Disaster deleted successfully' });
  } catch (err) {
    console.error('Error deleting disaster:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
