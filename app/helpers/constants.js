/**
 * @author Sávio Muniz
 */

module.exports = {
    'database': process.env.environment === 'production' ? 'mongodb://escolando:escolando@ds227570.mlab.com:27570/escolando' :
        'mongodb://localhost:27017/escolando'
};
