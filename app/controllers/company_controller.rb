class CompanyController < ApplicationController
  def index
  end

  def show
    @company = Hash.new
    p params[:companyname]
    @company[:name] = params[:companyname]
    @company[:year] = "2015"
  end
end
