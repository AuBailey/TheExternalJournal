import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.json.JSONArray;
import org.json.JSONObject;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;


public class HttpRequests {
    static URL url;

    public static User doLogin() {
        try {
            url = new URL("https://nuproject.tech/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setDoOutput(true);

            JsonObject cred = new JsonObject();
//            https://nuproject.tech/api/auth/register
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
            String[] strings =  content.toString().split(",");
            for (int i = 0; i < strings.length; i++) {
                System.out.println(i + " : " + strings[i]);
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
        return null;
    }

    public static void main(String[] args) {
        doLogin();
    }



}
