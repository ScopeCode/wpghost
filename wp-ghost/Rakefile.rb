desc 'Start Jekyll server and watch SCSS files'
task :server do
  puts "Starting the Jekyll server and watching SCSS files."
  jekyllPid = Process.spawn('jekyll --server')
  sassPid = Process.spawn('compass --watch')

  trap("INT") {
    [jekyllPid, sassPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, sassPid].each { |pid| Process.wait(pid) }
end