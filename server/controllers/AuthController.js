import getprismaInstance from "../utils/PrismaClient.js";

//controller to check if user email is valid or not
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

//controller to store user info entered in onboarding page to database
export const onBoardUser=async(req,res,next)=>{
   
    try{
     
        const {email,name,about,image:profilePicture}=req.body;
            if(!email||!name||!profilePicture)
            {
                return res.send("Email ,name, profilePicture is required");
            }
            else
            {
                const prisma=getprismaInstance();
                const user= await prisma.user.create({
                    data:{
                        email,
                        name,
                        about,
                        profilePicture
                    },
                });

                return res.json({msg:"Success",status:true, user});
            }

    }catch(error){
        
        console.log("yeah error ke jad hein");
        console.error("Error onboarding user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export const getAllUsers= async(req,res,next)=>{
    try{
       
        const prisma= getprismaInstance();
        const users=await prisma.user.findMany({
            orderBy:{name:'asc'},
            select:{
                id:true,
                name:true,
                email:true,
                profilePicture:true,
                about:true,
            },
        });
        console.log(users);

        const usersGroupedByInitialLetter={};
        users.forEach((user)=>{
            const initialLetter=user.name.charAt(0).toUpperCase();
            if(!usersGroupedByInitialLetter[initialLetter])
            {
                usersGroupedByInitialLetter[initialLetter]=[];
            }

            usersGroupedByInitialLetter[initialLetter].push(user);
        });
       
        return res.status(200).send({users:usersGroupedByInitialLetter});

    }catch(err){
        next(err);
    }
}


// req: The request object, representing the HTTP request.
// res: The response object, representing the HTTP response.
// next: A function that passes control to the next middleware function in the stack.