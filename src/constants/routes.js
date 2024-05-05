export default routes = {
    LOGIN: 'users/signin',
    SIGNUP: 'users/signup',
    DELETEACCOUNT: 'users/delete',
    REFRESHTOKEN: 'users/resettoken',

    USERINFO: 'users/profile',
    
    RECENT_RELEASED: 'anime/latest?page=',
    NEW_SEASON: 'anime/new?page=',
    POPULAR_ANIME: 'anime/popular?page=',
    ANIME_MOVIES: 'anime/movies?page=',

    ANIME_SEARCH: 'search/',
    
    ANIME_DETAILS: 'info/',
    ANIME_EPISODES: 'info/episodes/',
    
    ANIME_STREAM: 'watch/',

    GENRELIST: 'anime/genres',
    GENREANIMES: 'anime/genres/',

    SHOWPLAYLIST: 'playlist/show',
    ADDPLAYLIST: 'playlist/add',
    DELETEPLAYLIST: 'playlist/remove',
}