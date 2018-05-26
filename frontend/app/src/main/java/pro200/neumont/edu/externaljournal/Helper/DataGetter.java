package pro200.neumont.edu.externaljournal.Helper;

import android.content.Context;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import pro200.neumont.edu.externaljournal.Model.Journal.Journal;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataGetter {

    public static LoginValidationObj LoginValidation(String username, String password) throws Exception {
        HttpRequestHelper requestHelper = new HttpRequestHelper();

        String url = "https://nuproject.tech/api/auth/login";

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/x-www-form-urlencoded");

        Map<String, String> body = new HashMap<>();
        body.put("email", username);
        body.put("password", password);
//        requestHelper.doPost(url, headers, body);

        return null;//new LoginValidationObj(requestHelper.isSucceed(), requestHelper.getResponseMsg());
    }

    public static RegisterValidationObj RegisterValidation(String email, String username, String password) throws IOException
    {
        HttpRequestHelper requestHelper = new HttpRequestHelper();

        String url = "https://nuproject.tech/api/auth/register";

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/x-www-form-urlencoded");

        Map<String, String> body = new HashMap<>();
        body.put("email", email);
        body.put("username", username);
        body.put("password", password);

//        requestHelper.doPost(url, headers, body);

        return null; //new RegisterValidationObj(requestHelper.isSucceed(), requestHelper.getResponseMsg());
    }

    public static List<Journal> getJournals(String token) {
        return null;
    }

    public static Journal getJournalById(String token, String journalId) {
        return null;
    }
}
