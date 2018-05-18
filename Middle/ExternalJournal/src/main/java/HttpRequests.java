import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class HttpRequests {
    static URL url;

    public static User doLogin(String email,String password) {
        try {
            url = new URL("https://nuproject.tech/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setDoOutput(true);

            JsonObject cred = new JsonObject();
//            https://nuproject.tech/api/auth/register
            cred.addProperty("email",email);
            cred.addProperty("password",password);

            OutputStream os = con.getOutputStream();
            os.write(cred.toString().getBytes("UTF-8"));
            os.close();




            int status = con.getResponseCode();
            if(con.getResponseCode() == 200){

            }
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }



            Gson gson = new Gson();
            int id;
            String token;
            String mail;
            String username;
            String[] strings =  content.toString().split(",");




            for (int i = 0; i < strings.length; i++) {
                if (strings[i].contains("id")){
                   id =  getId(strings[i]);
                    System.out.println(id);
                }
                if (strings[i].contains("jwt")){
                    token = getToken(strings[i]);
                    System.out.println(token);
                }
                if (strings[i].contains("\"email\"")){
                    mail = getEmail(strings[i]);
                    System.out.println(mail);
                }
                if (strings[i].contains("username")){
                    username = getUserNAme(strings[i]);
                }
                    System.out.println(strings[i]);


            }

            User u = gson.fromJson(content.toString(), User.class);
            System.out.println(u.toString());


            in.close();
            con.disconnect();
            System.out.println(content.toString());

        } catch (MalformedURLException e) {

            e.printStackTrace();

        }

        catch (IOException e){

            e.printStackTrace();

        }

        return null;
    }

    private static String getUserNAme(String string) {
        String username;

    }

    private static String getEmail(String string) {
        String email = "";
        String[] temp = string.split(":");
        email = temp[1];
        return email;
    }

    public static void main(String[] args) {
        doLogin("isaiahcjc5@gmail.com","password123");
    }

    public static int getId(String s){
        String id = "";
        String[] temp = s.split("\\{");
        String[] ids = temp[1].split(":");
        id = ids[1];
        return Integer.parseInt(id);
    }

    public static String getToken(String s){
            String token;
        String[] temp = s.split("\\{");
        String[] ids = temp[1].split(":");
        token = ids[1];
        return token;
    }

}
