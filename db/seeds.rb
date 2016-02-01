# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

@company = Company.new
@company.ticker = "1111"
@company.name = "Cheese Company"
@company.year = "2015"
@company.fixed_asset = 30000
@company.current_asset = 20000
@company.equity = 35000
@company.long_term_liabilities = 8000
@company.short_term_liabilities = 7000
@company.revenue = 30000
@company.operating_income = 15000
@company.ibit = 10000
@company.net_income = 3500
@company.operation_cashflow = 5800
@company.financing_cashflow = 5500
@company.investment_cashflow = 2000
@company.save
