package com.example.kacper.infoviewer;

import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.example.kacper.infoviewer.Model.Image;
import com.example.kacper.infoviewer.Model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private OkHttpClient client = new OkHttpClient();
    //private final static String portalUrl = "http://10.0.2.2:8000/";          //do potestowania na emulatorze i localhoście
    private final static String portalUrl = "http://68.183.211.204:8000/";      //do potestowania na fizycznym urządzeniu
    private List<Image> imgList;
    private List<User> usersList;
    private ImageView imageView;
    private TextView authorName;
    private TextView authorNameLabel;
    private TextView infoTextView;

    private String newTimestamp = "";
    private String currentTimestamp = "";
    private Integer currentImageIndex = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        imageView = (ImageView)findViewById(R.id.image);
        authorName = (TextView) findViewById(R.id.author_name_text_view);
        authorNameLabel = (TextView) findViewById(R.id.author_name_text_view_label);
        infoTextView = (TextView) findViewById(R.id.info_text_view);

        try {
            loadImages();
        } catch (IOException e) {
            e.printStackTrace();
        }

        handlerLatest.post(checkLatestHandler);
        handlerSwitchImage.post(switchImage);
    }

    private Handler handlerLatest = new Handler();
    private Runnable checkLatestHandler = new Runnable() {
        @Override
        public void run() {
            pingLatestUrl();
            handlerLatest.postDelayed(this, 2000);
        }
    };

    private Handler handlerSwitchImage = new Handler();
    private Runnable switchImage = new Runnable() {
        @Override
        public void run() {
            showNextImage();
            handlerSwitchImage.postDelayed(this, 10000);
        }
    };

    private void compareTimestamps() throws IOException {
        if(!currentTimestamp.equals(newTimestamp)){
            loadImages();
            getUsersList();
            currentTimestamp = newTimestamp;
        }
    }

    private void loadImages() throws IOException {
        Request request = new Request.Builder()
                .url(portalUrl + "images/")
                .build();

        client.newCall(request).enqueue(new Callback() {
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
                                    imgList = Arrays.asList(imgArray);
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

    private void pingLatestUrl() {
        Request request = new Request.Builder()
                .url(portalUrl + "latest/")
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
                        if (jsonResponse != null) {
                            JsonObject jsonObject = new Gson().fromJson(jsonResponse, JsonObject.class);
                            newTimestamp = jsonObject.get("timestamp").toString();
                            try {
                                compareTimestamps();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                });
            }
        });
    }

    private void getUsersList(){
        Request request = new Request.Builder()
                .url(portalUrl + "users/")
                .build();

        client.newCall(request).enqueue(new Callback() {
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
                    .centerInside();

            if(!this.isDestroyed()){
                Glide.with(this)
                        .load(portalUrl+"media/" + imgList.get(currentImageIndex).getPic())
                        .apply(options)
                        .into(imageView);
            }

            Integer userId = imgList.get(currentImageIndex).getAuthor();
            for(User user:usersList){
                if (user.getPk() == userId){
                    String author = user.getFields().getFirst_name() + " " + user.getFields().getLast_name();
                    authorName.setText(author);
                }
            }

            currentImageIndex ++;
        }
        else{
            infoTextView.setVisibility(View.VISIBLE);
            imageView.setVisibility(View.GONE);
            authorNameLabel.setVisibility(View.GONE);
            authorName.setVisibility(View.GONE);
        }
    }
}
