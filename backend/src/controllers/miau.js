


const getAllMiaus = async (req, res) => {

    try {
        const allMiaus = await Miau.find();
        res.status(200).json(allMiaus);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};



const getMiauById = async (req, res) => {

    try{
        const { id } = req.params; 
        const miauFound = await Miau.findById(id);

        if (miauFound) {
            res.status(200).json(miauFound)
        } else {
            res.status(404).json({ error: "Miau no encontrado" });
        }
    } catch(error){
        res.status(500).json(error.message)
    }
};



const createMiau = async (req, res) => {

    try {
        const body = req.body;
        const miauToSave = new Miau(body);
        await miauToSave.save();
        res.status(201).json(miauToSave);
    } catch(error) {
        
        res.status(400).json(error.message);
    }
};





const updateMiau = async (req, res) => {
    try {
      const { id } = req.params;
      const miauFound = await Miau.findById(id);
      if (miauFound) {
        const body = req.body;
        const miauUpdated = await Miau.findByIdAndUpdate(id, body, { new: true });
        res.status(201).json(miauUpdated);
      } else {
        res.status(404).json({ error: "Miau no encontrado" });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };



  const deleteMiau = async (req, res) => {

    try {
        const { id } = req.params;
        const miauFound = await Miau.findById(id);
        if (miauFound) {
            await Miau.findByIdAndDelete(id);
        } else {
            res.status(404).json( "Miau no encontrado" );
        }
    } catch(error) {
        res.status(500).json(error.message)
    }
  };



  module.exports = {
    getAllMiaus,
    getMiauById,
    createMiau,
    updateMiau,
    deleteMiau
  }