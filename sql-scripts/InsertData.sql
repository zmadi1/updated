INSERT INTO zakhele.users (username,status,message) VALUES ("user1",false,"We just checking");
INSERT INTO zakhele.bot (bot,username,message) VALUES ("bot",(SELECT `username` FROM zakhele.users WHERE `username`='user1'),"I was listening to amapiano here!!!!");
