git status
git add .
git commit -m "v1.0.2.5 - fix3 process heroku"
git push origin master
git push heroku master
heroku logs --tails > last.log
