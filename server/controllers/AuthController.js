import getprismaInstance from "../utils/PrismaClient.js";

export const checkUser= async function(req,res,next){
    try{
        const {email}=req.body;
        if(!email)
        {
            return res.json({msg:"Email is required",status:false})
        }
        else
        {
            const prisma =getprismaInstance();
            const user=await prisma.user.findUnique({where:{email}});

            if(!user)
            {
               return res.json({msg:"User not found!",status:false});
            }
            else
            {
                return res.json({msg:"User found!",status:true,data:user});
            }
        }
    }catch(err){
        next(err);  
    }
}


// req: The request object, representing the HTTP request.
// res: The response object, representing the HTTP response.
// next: A function that passes control to the next middleware function in the stack.