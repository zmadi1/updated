CREATE TABLE zakhele.users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  status bool,
  message TEXT
);
CREATE TABLE zakhele.bot (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bot VARCHAR(100),
  username VARCHAR(20),
  message TEXT,
  FOREIGN KEY(username) REFERENCES `users`(username)
);

