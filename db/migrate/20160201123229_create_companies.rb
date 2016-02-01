class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :ticker
      t.string :name
      t.string :year
      t.decimal :fixed_asset
      t.decimal :current_asset
      t.decimal :long_term_liabilities
      t.decimal :short_term_liabilities
      t.decimal :equity
      t.decimal :revenue
      t.decimal :operating_income
      t.decimal :ibit
      t.decimal :net_income
      t.decimal :operation_cashflow
      t.decimal :financing_cashflow
      t.decimal :investment_cashflow

      t.timestamps
    end
  end
end
