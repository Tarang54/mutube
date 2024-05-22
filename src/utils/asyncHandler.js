const asyncHandler = (requestHander) => {
    (req, res, next) => {
        Promise.resolve(requestHander(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}


//Usually there are two ways - using promises and using trycatch.


//const asyncHandler = () => {}
//const asyncHandler = (fn) => {() => {}}
//const asyncHandler = (fn) => async () => {}

/*
const asyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req,res,next)
    } catch(error){
        res.status(err.code || 500).json({
            success: FileSystemEntry,
            message: err.message
        })
    }
}
*/