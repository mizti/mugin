Company.seed do |s|
  s.id = "1"
  s.ticker = "1111"
  s.name = "Cheese Company"
  s.year = "2015"
  s.fixed_asset = 30000
  s.current_asset = 20000
  s.equity = 35000
  s.long_term_liabilities = 8000
  s.short_term_liabilities = 7000
  s.revenue = 30000
  s.operating_income = 15000
  s.ibit = 10000
  s.net_income = 3500
  s.operation_cashflow = 5800
  s.financing_cashflow = 5500
  s.investment_cashflow = 2000
end
Company.seed do |s|
  s.id = "2"
  s.ticker = "1112"
  s.name = "Sukiyaki Company"
  s.year = "2015"
  s.fixed_asset = 20000
  s.current_asset = 10000
  s.equity = 15000
  s.long_term_liabilities = 2000
  s.short_term_liabilities = 13000
  s.revenue = 50000
  s.operating_income = -15000
  s.ibit = -10000
  s.net_income = -3500
  s.operation_cashflow = 4800
  s.financing_cashflow = -5500
  s.investment_cashflow = 3000
end

for i in 2000...3000
  Company.seed do |s|
    s.id = i.to_s #自動採番させたい
    s.ticker = i.to_s
    s.name = Faker::Company.name + " " + Faker::Company.suffix
    s.year = ["2014", "2015", "2016"].sample

    total_asset = Random.rand(10000..100000)
    s.fixed_asset = fixed_asset = Random.rand(0..total_asset)
    s.current_asset = current_asset = total_asset - fixed_asset 
    s.equity =  equity = Random.rand(0..total_asset)

    liabilities = total_asset - equity
    s.long_term_liabilities = long_term_liabilities = Random.rand(0..liabilities)
    s.short_term_liabilities = short_term_liabilities = liabilities - long_term_liabilities

    s.revenue = revenue = Random.rand(5000..70000)
    s.operating_income = operating_income = Random.rand(4000..revenue)
    s.ibit = ibit = Random.rand(-4000..operating_income)
    s.net_income = net_income = Random.rand(-10000..ibit)

    s.operation_cashflow = Random.rand(-20000..40000)
    s.financing_cashflow = Random.rand(-40000..60000)
    s.investment_cashflow = Random.rand(-50000..50000)
  end
end
