from .models import Song, Singer
from rest_framework import serializers

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'singer', 'duration']

# class SingerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Singer
#         fields = ['id', 'name', 'gender']


'''
By using above classes, we do not get any information about songs that are sung by singer
in singer api view

to include songs in singer api, we can use that related_name that we have defined in models.py
singer = models.ForeignKey(Singer, on_delete=models.CASCADE, related_name='song')

for this we just need to change the SingerClass as

though singer does not have song field, but due to relation it get added
'''
# class SingerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Singer
#         fields = ['id', 'name', 'gender', 'song']

'''
by doing above, we get list of ids of songs those are sung by singers,
to add hyperlinked list we can change above class as below
and
also to display name of songs instead of ids, we can use as below
'''
class SingerSerializer(serializers.ModelSerializer):
    song = serializers.StringRelatedField(many=True)  # to display name instead of id
    # song = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='song-detail') # to display hyperlink of particular song
    # view_name must be in the format of modelname-detail
    class Meta:
        model = Singer
        fields = ['id', 'name', 'gender', 'song']


'''above requirement can also be obtained by using nested serializers

for that we need to create 

class SingerSerializer(serializers.ModelSerializer):
    songs_sung = SongSerializer(many=True, read_only = True)
    class Meta:
        model = Singer
        fields = ['id', 'name', 'gender', 'songs_sung']
'''