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
  values ('Double Double', 'Two beef patties, two slices of American cheese, lettuce, tomato, onions, and spread', 'No fries or drink included' , '/imgs/D_double.png', 490, 'linear-gradient(110deg,hsl(240deg 100% 20%) 0%,hsl(224deg 100% 25%) 11%,hsl(218deg 100% 28%) 22%,hsl(212deg 100% 30%) 33%,hsl(206deg 100% 30%) 44%,hsl(199deg 100% 30%) 56%,hsl(190deg 100% 28%) 67%,hsl(180deg 100% 26%) 78%,hsl(170deg 100% 29%) 89%,hsl(161deg 78% 35%) 100%', 'meal'),
          ('Cheese burger' , 'Toasted bun, 1 slice of cheese, 1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , 'No fries or drink included' , '/imgs/CheeseB.png' , 350 , 'linear-gradient(0deg,hsl(240deg 100% 20%) 0%,hsl(241deg 59% 26%) 0%,hsl(232deg 46% 29%) -1%,hsl(217deg 40% 31%) -1%,hsl(199deg 38% 32%) -1%,hsl(179deg 40% 32%) -1%,hsl(166deg 54% 35%) 1%,hsl(161deg 78% 35%) 11%,hsl(141deg 36% 45%) 22%,hsl(111deg 26% 48%) 31%,hsl(85deg 32% 44%) 39%,hsl(67deg 39% 41%) 46%,hsl(54deg 50% 39%) 52%,hsl(47deg 66% 38%) 58%,hsl(44deg 92% 35%) 64%,hsl(47deg 88% 38%) 70%,hsl(49deg 85% 42%) 75%,hsl(51deg 82% 45%) 80%,hsl(54deg 79% 48%) 85%,hsl(56deg 81% 51%) 90%,hsl(58deg 90% 55%) 95%,hsl(60deg 100% 58%) 100%' , 'meal'),
          ('Hamburger' , 'Toasted bun,1 beef patty, grilled or raw onions, lettuce, spread, and tomatoes' , 'No Fries or drink included' , '/imgs/Hamburger.png' , 315 , 'linear-gradient(40deg,hsl(240deg 100% 20%) 0%,hsl(238deg 98% 26%) 5%,hsl(236deg 96% 33%) 10%,hsl(235deg 93% 40%) 15%,hsl(234deg 90% 48%) 21%,hsl(261deg 61% 50%) 26%,hsl(291deg 36% 45%) 32%,hsl(349deg 27% 51%) 38%,hsl(33deg 51% 44%) 44%,hsl(43deg 66% 43%) 50%,hsl(44deg 52% 54%) 56%,hsl(47deg 55% 64%) 62%,hsl(52deg 60% 74%) 68%,hsl(66deg 65% 81%) 74%,hsl(86deg 67% 77%) 80%,hsl(100deg 68% 73%) 87%,hsl(112deg 69% 69%) 93%,hsl(124deg 70% 64%) 100%' , 'meal'),
          ('French fries' , 'Chopped up fresh/warm potatoes' , 'These French fries are irresistibly good and warm.' , '/imgs/fries.png' , 279 , 'goldenrod' , 'sides'),
          ('Cheese fries' , 'Chopped up fresh/warm potatoes' , 'Gooey cheese melting in your mouth is all you need' , '/imgs/cheeseFry.png' , 279 , 'goldenrod' , 'sides'),
          ('Animal style fries' , 'Animal-Style Fries: the spread, cheese, and grilled onions are added to the fries' , 'Animal fries: a savory sensation.' , '/imgs/animalFries.png' , 425 , 'goldenrod' , 'sides'),
          ('Chocolate shake' , 'Vanilla ice cream, chocolate syrup, soy milk, and whipped cream' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/ChocolateShake.png' , 215 , 'brown' , 'Creamy Delights'),
          ('Strawberry shake' , 'Strawberries, milk, ice cream and flavoring ingredients like vanilla extract or strawberry syrup' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/StrawberryShake.png' , 215 , 'red' , 'Creamy Delights'),
          ('Vanilla shake' , 'Vanilla ice cream, milk, and vanilla extract' , 'Milkshakes offer a creamy, satisfying delight.' , '/imgs/VanillaShake.png' , 215 , 'grey' , 'Creamy Delights'),
          ('Coke' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/coke.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('Diet coke' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/dietCoke.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('Mountain dew' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/MtnDew.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('Dr pepper' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/DrPepper.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('7-up' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/7Up.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink' ),
          ('Root beer' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/RootBeer.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('Pink lemonade' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/PinkLem.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink'),
          ('Iced tea' , 'Fountain drink' , 'Sodas: Crisp, effervescent, and refreshing.' , '/imgs/icedTea.png' , 165 , 'https://www.shutterstock.com/image-vector/vector-realistic-isolated-neon-sign-600nw-1298384632.jpg' , 'Soft drink')
