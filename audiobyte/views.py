from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from youtube_search import YoutubeSearch
import requests
import json
import youtube_dl
SEARCH_URL = "https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&q="
BASE_URL="https://www.youtube.com/watch?v="

ydl_opts = {
    'format': 'bestaudio',
    'noplaylist':'True'
}

def home(request):
    return render(request,"home.html")

def suggestions(request):
    r=request.GET.get('data')
    print(r)
    res=str(requests.get(SEARCH_URL+r).text)[19:-1]
    if r:
        return JsonResponse({"results":res}) 
    else:
        return JsonResponse({})

def recommendations(request):
    item=request.GET.get("song")
    if item:
        results = YoutubeSearch(item, max_results=10).to_dict()
        return JsonResponse({"songs":results})
    else:
        return JsonResponse({})
    
def get_song(request):
    song_id=str((request.GET.get("song_id")))
    query_url=BASE_URL+song_id
    try:
        info=True
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(query_url,download=False)
        return JsonResponse({"play_results":{"id":song_id,
                "title":info["title"],
                "play_url":info["formats"][0]['url'],
                "description":info["description"]
            }})
    except:
        return JsonResponse({"error":"Something Went Wrong"})