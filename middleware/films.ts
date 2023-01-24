const moviesMiddleware = defineNuxtRouteMiddleware((to) => {
    if (+to.params.id > 6 || +to.params.id < 1) {
        return abortNavigation('')
    }
})