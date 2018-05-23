package pro200.neumont.edu.externaljournal.Helper;


import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

public class HttpRequestHelper {

    private Request request;
    private RequestBody requestBody;
    private OkHttpClient client;
    //    private Response response;
    private boolean isSucceed;
    private String responseFromServer;
    private String responseMsg;

    public void doPost(String url, Map<String, String> headers, Map<String, String> body) throws Exception {
        client = new OkHttpClient();

        requestBody = processBodyFromMap(body).build();

        request = new Request.Builder()
                .url(url)
                .headers(processHeaderFromMap(headers).build())
                .post(requestBody).build();

        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            public void onResponse(Call call, Response response)
                    throws IOException {
                responseFromServer = response.body().string();
                System.out.println("Response - " + responseFromServer);

                JsonObject jsonObj = new JsonParser().parse(responseFromServer).getAsJsonObject();
                if (jsonObj.get("success").getAsBoolean()) {
                    isSucceed = jsonObj.get("success").getAsBoolean();
                    responseMsg = "Success";
                    System.out.println("isSucceed - " + jsonObj.get("success").getAsBoolean());
                    System.out.println("jwt - " + jsonObj.get("data").getAsJsonObject().get("jwt").toString());
                } else {
                    isSucceed = jsonObj.get("success").getAsBoolean();
                    responseMsg = jsonObj.get("message").toString();
                    System.out.println("isSucceed - " + jsonObj.get("success").getAsBoolean());
                    System.out.println("message - " + jsonObj.get("message").toString());
                }
            }


            public void onFailure(Call call, IOException e) {
                responseFromServer = "Unexpected error occured";
            }
        });

        wait(50000);
    }

    public static Headers.Builder processHeaderFromMap(Map<String, String> headers) {
        Headers.Builder header = new Headers.Builder();
        for (Map.Entry<String, String> entry : headers.entrySet()) {
            header.add(entry.getKey(), entry.getValue());
        }
        return header;
    }

    public static  FormBody.Builder processBodyFromMap(Map<String, String> body) {
        FormBody.Builder formBody = new FormBody.Builder();
        for (Map.Entry<String, String> entry : body.entrySet()) {
            formBody.add(entry.getKey(), entry.getValue());
        }
        return formBody;
    }

//    public boolean isSucceed() {
//        return isSucceed;
//    }
//
//    public String getResponseMsg() {
//        return responseMsg;
//    }
}