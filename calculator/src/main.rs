
struct Calculator {
    result: f64,
}

impl Calculator {
    fn new() -> Calculator {
        Calculator { result: 0.0 }
    }

    fn add(&mut self, value: f64) {
        self.result += value;
    }

    fn subtract(&mut self, value: f64) {
        self.result -= value;
    }

    fn multiply(&mut self, value: f64) {
        self.result *= value;
    }

    fn divide(&mut self, value: f64) {
        self.result /= value;
    }
}

/* the main function
ends hereee */
fn main() {
    let mut calculator = Calculator::new();

    calculator.add(5.0);
    calculator.subtract(2.0);
    calculator.multiply(3.0);
    calculator.divide(4.0);

    println!("Result: {}", calculator.result);
   
}