module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel', 'module:react-native-dotenv'],
      },
    },
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    plugins: [["module:react-native-dotenv"]],
  };
};

