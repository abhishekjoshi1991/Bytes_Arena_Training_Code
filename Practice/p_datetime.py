import datetime, pytz

# datetime.date --> to work with year, month and day

d = datetime.date(2022,12,26)
print(d)

tday = datetime.date.today()
print(tday)
print(tday.month)
print(tday.year)
print(tday.day)
print(tday.weekday()) #0 being monday
print(tday.isoweekday()) # 1 being monday

# timedelta --> difference between two datetime

tdelta = datetime.timedelta(days=7)
print(tday + tdelta)

# date2 = date2 + timedelta
# timedelta = date1 + date2
# days till bday
bday = datetime.date(2023,4,30)
till_bday = bday - tday
print(till_bday)
print(till_bday.days)


# datetime.time --> to work with hh, mm and ss

t = datetime.time(9,30,54,2500)
print(t)
print(t.hour)
print(t.minute)

# datetime.datetime --> to work with date and time both

d = datetime.datetime(2022,12,26,8,26,32)
print(d)

# difference between following dates
dt_today = datetime.datetime.today() # date without timezone aware
dt_now = datetime.datetime.now() # date with option of timezone passing
dt_utcnow = datetime.datetime.utcnow() # utc current time without time zone
print(dt_today)
print(dt_now)
print(dt_utcnow)

# to use timezone, pytz module can be used

dt = datetime.datetime(2022,12,27,5,00,00, tzinfo=pytz.UTC)
print(dt) # added +00:00

dt_now = datetime.datetime.now(tz=pytz.UTC)
print(dt_now)

# to get local time compared to utc
d2 = dt_now.astimezone(pytz.timezone('Asia/Kolkata'))

print(d2)

# list of timezones
for tz in pytz.all_timezones:
   print(tz)










