-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- -- EXAMPLE:
-- insert into "Food" ("name" , "description" , "imageUrl" , "price" , "category")
--   values ('Double Double' , 'Two beef patties, two slices of American cheese, lettuce, tomato, onions, and spread' , '/imgs/D_double.png' , 490 , 'meal'),
--           ('Cheese burger' , 'Toasted bun, 1 slice of cheese, 1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , '/imgs/CheeseB.png' , 350 , 'meal'),
--           ('Hamburger' , 'Toasted bun,1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , '/imgs/Hamburger.png' , 315 , 'meal'),
--           ('Chocolate shake' , 'Smoothie' , '/imgs/ChocolateShake.png' , 215 , 'Creamy Delights'),
--           ('Strawberry shake' , 'Smoothie' , '/imgs/StrawberryShake.png' , 215 , 'Creamy Delights'),
--           ('Vanilla shake' , 'Smoothie' , '/imgs/VanillaShake.png' , 215 , 'Creamy Delights'),
--           ('Coke' , 'Fountain drink' , '/imgs/coke.png' , 165 , 'Soft drink'),
--           ('Diet coke' , 'Fountain drink' , '/imgs/dietCoke.png' , 165 , 'Soft drink'),
--           ('Mountain dew' , 'Fountain drink' , '/imgs/MtnDew.png' , 165 , 'Soft drink'),
--           ('Dr pepper' , 'Fountain drink' , '/imgs/DrPepper.png' , 165 , 'Soft drink'),
--           ('7-up' , 'Fountain drink' , '/imgs/7Up.png' , 165 , 'Soft drink' ),
--           ('Root beer' , 'Fountain drink' , '/imgs/RootBeer.png' , 165 , 'Soft drink'),
--           ('Pink lemonade' , 'Fountain drink' , '/imgs/PinkLem.png' , 165 , 'Soft drink'),
--           ('Iced tea' , 'Fountain drink' , '/imgs/icedTea.png' , 165 , 'Soft drink')




-- /imgs/ChocolateShake.png




-- EXAMPLE:
insert into "Food" ("name" , "description" , "notice" , "imageUrl" , "price" , "background" , "category")
  values ('Double Double', 'Two beef patties, two slices of American cheese, lettuce, tomato, onions, and spread', 'No fries or drink included' , '/imgs/D_double.png', 490, ' linear-gradient(180.8deg, rgb(139, 10, 130) 6.9%, rgb(73, 6, 70) 73.2%)', 'meal'),
          ('Cheese burger' , 'Toasted bun, 1 slice of cheese, 1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , 'No fries or drink included' , '/imgs/CheeseB.png' , 350 , 'linear-gradient(0deg,hsl(240deg 100% 20%) 0%,hsl(241deg 59% 26%) 0%,hsl(232deg 46% 29%) -1%,hsl(217deg 40% 31%) -1%,hsl(199deg 38% 32%) -1%,hsl(179deg 40% 32%) -1%,hsl(166deg 54% 35%) 1%,hsl(161deg 78% 35%) 11%,hsl(141deg 36% 45%) 22%,hsl(111deg 26% 48%) 31%,hsl(85deg 32% 44%) 39%,hsl(67deg 39% 41%) 46%,hsl(54deg 50% 39%) 52%,hsl(47deg 66% 38%) 58%,hsl(44deg 92% 35%) 64%,hsl(47deg 88% 38%) 70%,hsl(49deg 85% 42%) 75%,hsl(51deg 82% 45%) 80%,hsl(54deg 79% 48%) 85%,hsl(56deg 81% 51%) 90%,hsl(58deg 90% 55%) 95%,hsl(60deg 100% 58%) 100%' , 'meal'),
          ('Hamburger' , 'Toasted bun,1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , 'No Fries or drink included' , '/imgs/Hamburger.png' , 315 , 'radial-gradient(circle at 10% 20%, rgb(228, 118, 0) 0%, rgb(247, 189, 2) 90%)' , 'meal'),
          ('French fries' , 'Chopped up fresh/warm potatoes' , 'These French fries are irresistibly good and warm.' , '/imgs/fries.png' , 279 , 'goldenrod' , 'sides'),
          ('Cheese fries' , 'Chopped up fresh/warm potatoes' , 'Gooey cheese melting in your mouth is all you need' , '/imgs/cheeseFry.png' , 279 , 'goldenrod' , 'sides'),
          ('Animal style fries' , 'Animal-Style Fries: the spread, cheese, and grilled onions are added to the fries' , 'Animal fries: a savory sensation.' , '/imgs/animalFries.png' , 425 , 'goldenrod' , 'sides'),
          ('Chocolate shake' , 'Vanilla ice cream, chocolate syrup, soy milk, and whipped cream' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/ChocolateShake.png' , 215 , 'brown' , 'Creamy Delights'),
          ('Strawberry shake' , 'Strawberries, milk, ice cream and flavoring ingredients like vanilla extract or strawberry syrup' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/StrawberryShake.png' , 215 , 'red' , 'Creamy Delights'),
          ('Vanilla shake' , 'Vanilla ice cream, milk, and vanilla extract' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/VanillaShake.png' , 215 , 'grey' , 'Creamy Delights'),
          ('Coke' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/coke.png' , 165 , 'darkred' ,  'Soft drink'),
          ('Diet coke' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/dietCoke.png' , 165 , 'darkred' , 'Soft drink'),
          ('Cherry coke' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/cherryCoke.png' , 165 , 'darkred' , 'Soft drink'),
          ('Mountain dew' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/MtnDew.png' , 165 , 'limegreen' , 'Soft drink'),
          ('Dr pepper' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/DrPepper.png' , 165 , 'darkred' , 'Soft drink'),
          ('7-up' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/7Up.png' , 165 , 'limegreen' , 'Soft drink' ),
          ('Root beer' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/RootBeer.png' , 165 , 'brown' , 'Soft drink'),
          ('Pink lemonade' , 'Fountain drink' , 'Slightly sweeter and fruitier taste than regular lemonade.' , '/imgs/PinkLem.png' , 165 , 'linear-gradient(106.5deg, rgba(255, 215, 185, 0.91) 23%, rgba(223, 159, 247, 0.8) 93%)' , 'Soft drink'),
          ('Iced tea' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/icedTea.png' , 165 , 'radial-gradient(circle at 10% 50.5%, rgb(255, 107, 6) 0%, rgb(255, 1, 107) 90%)' , 'Soft drink');


insert into "Users"("username" , "hashedPassword")
        values('placeholder_' , '$argon2id$v=19$m=4096,t=3,p=1$shBZQvbAOG8Bh1hJ5n/HlQ$PGJkS3BN3LaX5Ayd2wq3hivOtCRDOl38D9IMQxgOFpo')
