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
