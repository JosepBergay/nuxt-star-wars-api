const authMiddleware = defineNuxtRouteMiddleware((to, from) => {
    // throw createError('Secret Page')
    return abortNavigation('Secret page')
})

export default authMiddleware