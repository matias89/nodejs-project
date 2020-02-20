const controller = {
    list: (req, res) => {
        return res.status(200).send({
            message: 'Listado',
            status: 200,
        });
    },
    test: () => {

    },
};

module.exports = controller;