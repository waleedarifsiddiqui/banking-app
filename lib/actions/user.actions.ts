'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const SignIn = async () => {
    try {
        //Mutation / Database / Make fetch
    } catch (error) {
        console.log('Error', error);
        
    }
}


export const SignUp = async (userData: SignUpParams) => {

    const {email, password, firstName, lastName} = userData;
    try {
        const { account } = await createAdminClient();
        const NewUserAccount  = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);


        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(NewUserAccount);
            
        } catch (error) {
            console.log('Error', error);
            
        }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
      const user = await account.get();

      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  