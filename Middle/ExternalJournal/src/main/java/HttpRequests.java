import com.google.gson.JsonObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class HttpRequests {
     static URL url;

public static void doStuff() {
        try {
            url = new URL("https://ywudticnj5.execute-api.us-east-1.amazonaws.com/production/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setDoOutput(true);

            JsonObject cred = new JsonObject();
            
            cred.addProperty("email","isaiahcjc5@gmail.com");
            cred.addProperty("password","password123");

            OutputStream os = con.getOutputStream();
            os.write(cred.toString().getBytes("UTF-8"));
            os.close();
            int status = con.getResponseCode();
            System.out.println(status);
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            System.out.println(content.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        doStuff();
    }



}
