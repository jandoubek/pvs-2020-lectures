using JSON

predmety = []
predmet = Dict("day"=>"monday", "code"=>"OOP", "lecturer"=>"Virius", "room"=>"T-214", "time" => "13:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"monday", "code"=>"FT", "lecturer"=>"Mlynar", "room"=>"B-11", "time" => "9:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"monday", "code"=>"POLO", "lecturer"=>"Potucek", "room"=>"T-386", "time" => "11:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"tuesday", "code"=>"SQL", "lecturer"=>"Kukal", "room"=>"T-208", "time" => "7:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"tuesday", "code"=>"SPDO", "lecturer"=>"Novotny", "room"=>"B-211a", "time" => "8:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"tuesday", "code"=>"SPJE", "lecturer"=>"Dusek", "room"=>"KJR-L144", "time" => "14:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"wendesday", "code"=>"FIMA", "lecturer"=>"Hora", "room"=>"T-205", "time" => "7:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"wendesday", "code"=>"FM1", "lecturer"=>"Karlik", "room"=>"KMAT-M", "time" => "8:30", "length" => "4")
push!(predmety, predmet)
predmet = Dict("day"=>"wendesday", "code"=>"EXSH", "lecturer"=>"Sumbera", "room"=>"B-10", "time" => "13:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"thursday", "code"=>"SZD", "lecturer"=>"Myska", "room"=>"B-009", "time" => "13:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"thursday", "code"=>"PDZ", "lecturer"=>"Prusa", "room"=>"B-201", "time" => "15:30", "length" => "4")
push!(predmety, predmet)
predmet = Dict("day"=>"thursday", "code"=>"SOFCcv", "lecturer"=>"Tran", "room"=>"T-124", "time" => "9:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"friday", "code"=>"TIN", "lecturer"=>"Hobza", "room"=>"T-101", "time" => "9:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"friday", "code"=>"NIPL", "lecturer"=>"Kral", "room"=>"KFE-L244", "time" => "13:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"friday", "code"=>"KTPA1", "lecturer"=>"Jizba", "room"=>"B-10", "time" => "11:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"thursday", "code"=>"SUPR", "lecturer"=>"Janu", "room"=>"T-386", "time" => "7:30", "length" => "4")
push!(predmety, predmet)
predmet = Dict("day"=>"thursday", "code"=>"RSPL", "lecturer"=>"Buryi", "room"=>"KIPL PC", "time" => "13:30", "length" => "2")
push!(predmety, predmet)
predmet = Dict("day"=>"tuesday", "code"=>"AND", "lecturer"=>"Vratislav", "room"=>"T-386", "time" => "7:30", "length" => "2")
push!(predmety, predmet)

open("predmety.json","w") do io
    println(io, JSON.json(predmety))
end