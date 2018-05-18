package pro200.neumont.edu.externaljournal.Helper;

import com.google.gson.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;


public class RequestHelper {
    static URL url;
    static boolean status;
    static String message;
    static StringBuffer content;

    public static LoginValidationObj doLogin(String email, String password) {
        try {
            url = new URL("https://nuproject.tech/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setDoOutput(true);

            JsonObject cred = new JsonObject();
            cred.addProperty("email", email);
            cred.addProperty("password", password);

            OutputStream os = con.getOutputStream();
            os.write(cred.toString().getBytes("UTF-8"));
            os.close();

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }

            if (con.getResponseCode() == 200) {
                status = true;
                message = parseJwt(content.toString());
            }


            in.close();
            con.disconnect();

        } catch (IOException e) {
            status = false;
            message = "Authentication Error";
        }

        System.out.println(status);
        System.out.println(message);
        return new LoginValidationObj(status, message);
    }

    private static String parseError(String s) {
        JsonElement jelement = new JsonParser().parse(s);
        JsonObject message = jelement.getAsJsonObject();
        message = message.getAsJsonObject("message");
        return message.getAsString();
    }


    public static String parseJwt(String jsonLine) {
        JsonElement jelement = new JsonParser().parse(jsonLine);
        JsonObject jobject = jelement.getAsJsonObject();
        jobject = jobject.getAsJsonObject("data");
        JsonElement data = new JsonParser().parse(jobject.toString());
        JsonObject jsonObject = data.getAsJsonObject();
        String result = jsonObject.get("jwt").getAsString();
        return result;
    }
}
