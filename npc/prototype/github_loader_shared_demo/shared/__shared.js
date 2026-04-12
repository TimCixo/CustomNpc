module.exports = {
    use: function(event, libraryId) {
        return gitLoaderRequireShared(event, libraryId);
    }
};
