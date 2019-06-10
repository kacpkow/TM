package com.example.kacper.infoviewer;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.signature.ObjectKey;
import com.example.kacper.infoviewer.Model.Device;
import com.example.kacper.infoviewer.Model.Image;
import com.example.kacper.infoviewer.Model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private OkHttpClient client = new OkHttpClient();
    private final static String portalUrl = "http://10.0.2.2:8000/";          //do potestowania na emulatorze i localhoście
//    private final static String portalUrl = "http://157.158.168.154:8000/";      //do potestowania na fizycznym urządzeniu
    private List<Image> imgList = new ArrayList<>();
    private List<User> usersList;
    private ImageView imageView;
    private TextView authorName;
    private TextView authorNameLabel;
    private TextView infoTextView;
    private TextView settingsTextView;

    private String newTimestamp = "";
    private String currentTimestamp = "";
    private Integer currentImageIndex = 0;

    private Integer changeRate;
    Boolean launchedBefore = false;
    static boolean active = false;

//    Integer deviceId = -1;
    Integer deviceId = 2;

    Request imageRequest;
    Request latestRequest;
    Request usersRequest;
    Boolean imageViewVisible = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        imageView = (ImageView)findViewById(R.id.image);
        authorName = (TextView) findViewById(R.id.author_name_text_view);
        authorNameLabel = (TextView) findViewById(R.id.author_name_text_view_label);
        infoTextView = (TextView) findViewById(R.id.info_text_view);
        settingsTextView = (TextView) findViewById(R.id.settingsTextView);

        settingsTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), SettingsActivity.class);
                startActivity(intent);
            }
        });

    }

    private void prepareRequests(){
        Integer id = deviceId;

        RequestBody formBody = new FormBody.Builder()
                .add("id", String.valueOf(id))
                .build();

        imageRequest = new Request.Builder()
                .url(portalUrl + "images/")
                .post(formBody)
                .addHeader("content-type", "application/json")
                .build();

        latestRequest = new Request.Builder()
                .url(portalUrl + "latest/")
                .post(formBody)
                .addHeader("content-type", "application/json")
                .build();

        usersRequest = new Request.Builder()
                .url(portalUrl + "users/")
                .build();
    }

    private Handler handlerLatest = new Handler();
    private Runnable checkLatestHandler = new Runnable() {
        @Override
        public void run() {
            if(deviceId != -1){
                pingLatestUrl();
                handlerLatest.postDelayed(this, 2000);
            }
        }
    };

    private Handler handlerSwitchImage = new Handler();
    private Runnable switchImage = new Runnable() {
        @Override
        public void run() {
            showNextImage();
            handlerSwitchImage.postDelayed(this, changeRate*1000);
        }
    };

    private void compareTimestamps() throws IOException {
        if(!currentTimestamp.equals(newTimestamp)){
            Log.e("timestamps", "are not same");
            loadImages();
            getUsersList();
            currentTimestamp = newTimestamp;
        }
        else{
            Log.e("timestamps", "are same");
        }
    }

    private void loadImages() throws IOException {

        client.newCall(imageRequest).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                final String jsonResponse = response.body().string();
                final Gson gson = new Gson();
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (jsonResponse != null) {
                            Gson objGson = new GsonBuilder().setLenient().create();
                            Type listType = new TypeToken<List<Image>>() {
                            }.getType();

                            try {
                                List<Image> readFromJson = objGson.fromJson(jsonResponse, listType);
                                if (readFromJson != null) {
                                    Image[] imgArray = gson.fromJson(jsonResponse, Image[].class);
                                    imgList.addAll(Arrays.asList(imgArray));
                                }

                            } catch (JsonSyntaxException e) {
                                Log.e("error", "error in syntax in returning json1");
                            }
                        }

                    }
                });
            }
        });
    }

    private void pingLatestUrl() {
        client.newCall(latestRequest).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, final Response response){
                String jsonResponse = null;
                try {
                    jsonResponse = response.body().string();
                } catch (IOException e) {
                    e.printStackTrace();
                    if(imageViewVisible == true){
                        disableImageView();
                    }
                }
                String finalJsonResponse = jsonResponse;
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (finalJsonResponse != null) {
                            Log.d("jsonresp", finalJsonResponse);
                            JsonObject jsonObject = new Gson().fromJson(finalJsonResponse, JsonObject.class);
                            newTimestamp = jsonObject.get("timestamp").toString();
                            String ts = jsonObject.get("timestamp").toString();
                            if(!ts.equals("\"null\"")){
                                try {
                                    if(imageViewVisible == false){
                                        enableImageView();
                                    }
                                    compareTimestamps();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                            else{
                                imgList.clear();
                                disableImageView();
                            }
                        }
                    }
                });
            }
        });
    }

    private void getUsersList(){

        client.newCall(usersRequest).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                final String jsonResponse = response.body().string();
                final Gson gson = new Gson();
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (jsonResponse != null) {
                            Gson objGson = new GsonBuilder().setLenient().create();
                            Type listType = new TypeToken<List<User>>() {
                            }.getType();

                            try {
                                List<User> readFromJson = objGson.fromJson(jsonResponse, listType);
                                if (readFromJson != null) {
                                    User[] userArray = gson.fromJson(jsonResponse, User[].class);
                                    usersList = Arrays.asList(userArray);
                                }

                            } catch (JsonSyntaxException e) {
                                Log.e("error", "error in syntax in returning json");
                            }
                        }
                    }
                });
            }
        });
    }

    private void showNextImage() {
        if(imgList != null && imgList.size() != 0){
            infoTextView.setVisibility(View.GONE);
            imageView.setVisibility(View.VISIBLE);
            authorNameLabel.setVisibility(View.VISIBLE);
            authorName.setVisibility(View.VISIBLE);
            if(!(currentImageIndex < imgList.size())){
                currentImageIndex = 0;
            }
            RequestOptions options = new RequestOptions()
                    //.skipMemoryCache(true)
                    .centerInside()
                    .signature(new ObjectKey(currentTimestamp));

            if(!this.isDestroyed()){
                try {
                    Glide.with(this)
                            .load(new URL(portalUrl+"image/" + imgList.get(currentImageIndex).getId() + "/"))
                            .apply(options)
                            .into(imageView);
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }
            }

            String authorUsername = imgList.get(currentImageIndex).getAuthor();
            if(usersList != null){
                for(User user:usersList){
                    if (user.getFields().getUsername().equals(authorUsername)){
                        String author = user.getFields().getFirst_name() + " " + user.getFields().getLast_name();
                        authorName.setText(author);
                    }
                }
            }

            currentImageIndex ++;
        }
        else{
            disableImageView();
        }
    }

    @Override
    protected void onPause(){
        super.onPause();
        handlerLatest.removeCallbacks(checkLatestHandler);
    }

    private void disableImageView(){
        infoTextView.setVisibility(View.VISIBLE);
        imageView.setVisibility(View.GONE);
        authorNameLabel.setVisibility(View.GONE);
        authorName.setVisibility(View.GONE);
        imageViewVisible = false;
    }

    private void enableImageView(){
        infoTextView.setVisibility(View.GONE);
        imageView.setVisibility(View.VISIBLE);
        authorNameLabel.setVisibility(View.VISIBLE);
        authorName.setVisibility(View.VISIBLE);
        imageViewVisible = true;
    }

    private void showConfigurationWindow(View view){
        // inflate the layout of the popup window
        LayoutInflater inflater = (LayoutInflater)
                getSystemService(LAYOUT_INFLATER_SERVICE);
        View popupView = inflater.inflate(R.layout.window_configuration, null);

        // create the popup window
        int width = LinearLayout.LayoutParams.WRAP_CONTENT;
        int height = LinearLayout.LayoutParams.WRAP_CONTENT;
        boolean focusable = true; // lets taps outside the popup also dismiss it
        final PopupWindow popupWindow = new PopupWindow(popupView, width, height, focusable);

        Button saveButton = (Button)popupView.findViewById(R.id.save_configuration_button);
        EditText deviceName = (EditText)popupView.findViewById(R.id.device_name);
        EditText devicePassword = (EditText)popupView.findViewById(R.id.device_password);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                saveWindowData(deviceName.getText().toString(), devicePassword.getText().toString());
                popupWindow.dismiss();
            }
        });

        popupWindow.showAtLocation(view, Gravity.CENTER, 0, 0);
    }

    private void saveWindowData(String name, String password) {
        Device device = new Device();
        device.setName(name);
        device.setPassword(password);

        Gson gson = new Gson();
        MediaType mediaType = MediaType.parse("application/json");

        RequestBody requestBody = RequestBody.create(mediaType, gson.toJson(device));

        Request request = new Request.Builder()
                .url(portalUrl + "device/")
                .post(requestBody)
                .addHeader("content-type", "application/json")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                final String jsonResponse = response.body().string();
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Log.e("response", jsonResponse);
                        if (jsonResponse != null) {
                            if(response.code() == 201){
                                Log.e("device added",  "successfully");
                                try {
                                    JSONObject jObject = new JSONObject(jsonResponse);
                                    deviceId = jObject.getInt("id");
                                    SharedPreferences sp = getSharedPreferences("SETTINGS", MODE_PRIVATE);
                                    SharedPreferences.Editor spEditor = sp.edit();
                                    spEditor.putInt("id", deviceId);
                                    spEditor.putBoolean("LAUNCHED_BEFORE", true);
                                    spEditor.commit();
                                    prepareRequests();
                                    departRequests();
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    @Override
    protected void onResume(){
        super.onResume();
        SharedPreferences sp = getSharedPreferences("SETTINGS", MODE_PRIVATE);
        changeRate = sp.getInt("CHANGE_RATE", 5);

        deviceId = sp.getInt("id", -1);
        launchedBefore = sp.getBoolean("LAUNCHED_BEFORE", false);

        handlerSwitchImage.removeCallbacks(switchImage);
        prepareRequests();

        if(launchedBefore == false && active == true){
            new Handler().postDelayed (() -> {
                showConfigurationWindow((View)findViewById(R.id.root_view));
            }, 1000);
        }

        if(launchedBefore == true && active == true){
            departRequests();
        }
    }

    private void departRequests(){

        try {
            loadImages();
        } catch (IOException e) {
            e.printStackTrace();
        }
        getUsersList();

        handlerLatest.post(checkLatestHandler);
        handlerSwitchImage.post(switchImage);
    }

    @Override
    public void onStart() {
        super.onStart();
        active = true;
    }

    @Override
    public void onStop() {
        super.onStop();
        active = false;
    }
}
