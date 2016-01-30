class CompanyController < ApplicationController
  def show
    @company = Hash.new
    @company[:name] = params["company_code"]
    @company[:year] = "2014"
    @company[:about] = "hello"
  end
end
