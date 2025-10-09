/*
  # Initial Schema for Hostel Mess Management System

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `role` (text, either 'student' or 'committee')
      - `created_at` (timestamp)
    
    - `menu_items`
      - `id` (uuid, primary key)
      - `day` (text)
      - `breakfast` (text array)
      - `lunch` (text array)
      - `snacks` (text array)
      - `dinner` (text array)
      - `updated_at` (timestamp)
    
    - `workers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `photo` (text, URL)
      - `upi_id` (text)
      - `role` (text)
      - `created_at` (timestamp)
    
    - `complaints`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `student_name` (text)
      - `category` (text)
      - `description` (text)
      - `image_url` (text, nullable)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    
    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `priority` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'committee')),
  created_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day text NOT NULL UNIQUE,
  breakfast text[] DEFAULT '{}',
  lunch text[] DEFAULT '{}',
  snacks text[] DEFAULT '{}',
  dinner text[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Create workers table
CREATE TABLE IF NOT EXISTS workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo text NOT NULL,
  upi_id text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id),
  student_name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'resolved')),
  created_at timestamptz DEFAULT now()
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for menu_items table
CREATE POLICY "Anyone can read menu items"
  ON menu_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Committee can update menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role = 'committee'
    )
  );

-- Create policies for workers table
CREATE POLICY "Anyone can read workers"
  ON workers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Committee can manage workers"
  ON workers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role = 'committee'
    )
  );

-- Create policies for complaints table
CREATE POLICY "Students can read own complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (student_id::text = auth.uid()::text);

CREATE POLICY "Students can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id::text = auth.uid()::text);

CREATE POLICY "Committee can read all complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role = 'committee'
    )
  );

CREATE POLICY "Committee can update complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role = 'committee'
    )
  );

-- Create policies for announcements table
CREATE POLICY "Anyone can read announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Committee can manage announcements"
  ON announcements
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id::text = auth.uid()::text 
      AND users.role = 'committee'
    )
  );

-- Insert initial menu data
INSERT INTO menu_items (day, breakfast, lunch, snacks, dinner) VALUES
('Monday', 
 ARRAY['Poha', 'Bread & Butter', 'Tea/Coffee'],
 ARRAY['Rice', 'Dal Tadka', 'Aloo Sabzi', 'Roti', 'Salad'],
 ARRAY['Samosa', 'Tea', 'Biscuits'],
 ARRAY['Rice', 'Rajma', 'Mixed Vegetables', 'Roti', 'Curd']
),
('Tuesday',
 ARRAY['Upma', 'Banana', 'Tea/Coffee'],
 ARRAY['Rice', 'Sambar', 'Bhindi Fry', 'Roti', 'Pickle'],
 ARRAY['Pakora', 'Coffee', 'Namkeen'],
 ARRAY['Rice', 'Chana Masala', 'Cauliflower Curry', 'Roti', 'Raita']
),
('Wednesday',
 ARRAY['Paratha', 'Curd', 'Tea/Coffee'],
 ARRAY['Rice', 'Dal Fry', 'Palak Paneer', 'Roti', 'Salad'],
 ARRAY['Bread Pakora', 'Tea', 'Chips'],
 ARRAY['Rice', 'Kadhi', 'Aloo Gobi', 'Roti', 'Pickle']
),
('Thursday',
 ARRAY['Idli Sambar', 'Coconut Chutney', 'Tea/Coffee'],
 ARRAY['Rice', 'Rasam', 'Egg Curry', 'Roti', 'Papad'],
 ARRAY['Vada Pav', 'Coffee', 'Mixture'],
 ARRAY['Rice', 'Dal Makhani', 'Jeera Aloo', 'Roti', 'Curd']
),
('Friday',
 ARRAY['Dosa', 'Sambar', 'Chutney', 'Tea/Coffee'],
 ARRAY['Rice', 'Dal', 'Fish Curry', 'Roti', 'Salad'],
 ARRAY['Dhokla', 'Tea', 'Sev'],
 ARRAY['Rice', 'Paneer Butter Masala', 'Green Beans', 'Roti', 'Raita']
),
('Saturday',
 ARRAY['Puri Bhaji', 'Tea/Coffee'],
 ARRAY['Rice', 'Sambar', 'Chicken Curry', 'Roti', 'Pickle'],
 ARRAY['Pani Puri', 'Coffee', 'Bhel Puri'],
 ARRAY['Rice', 'Dal', 'Mix Veg', 'Roti', 'Curd', 'Ice Cream']
),
('Sunday',
 ARRAY['Chole Bhature', 'Tea/Coffee'],
 ARRAY['Rice', 'Dal', 'Mutton Curry', 'Roti', 'Salad'],
 ARRAY['Jalebi', 'Tea', 'Mathri'],
 ARRAY['Rice', 'Rajma', 'Cabbage Sabzi', 'Roti', 'Sweet Dish']
);

-- Insert initial workers data
INSERT INTO workers (name, photo, upi_id, role) VALUES
('Ramesh Kumar', 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150', 'ramesh.kumar@paytm', 'Head Chef'),
('Priya Sharma', 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150', 'priya.sharma@phonepe', 'Assistant Chef'),
('Suresh Patel', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', 'suresh.patel@gpay', 'Kitchen Helper'),
('Anita Devi', 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=150', 'anita.devi@paytm', 'Cleaner');

-- Insert initial announcements
INSERT INTO announcements (title, content, priority) VALUES
('Special Dinner Tomorrow', 'We will be serving special biryani for dinner tomorrow to celebrate the festival. Please inform your friends!', 'high'),
('Mess Timing Change', 'Starting next week, breakfast timing will be extended till 10:30 AM due to popular demand.', 'medium'),
('New Menu Items', 'We have added South Indian items to our breakfast menu. Try our new dosa and uttapam!', 'low');